import { useModal } from "../../hooks/use-modal";
import { PropsImmobles, PropsPhoto } from "../../global/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/api";

type PropsModal = {
  photos: PropsPhoto[] | [];
  immobleId: string | undefined;
  addPhotos?: (data: PropsPhoto[]) => void;
};

export default function ModalPhoto({
  photos,
  immobleId,
  addPhotos,
}: PropsModal) {
  const [photoModal, setPhotoModal] = useState<PropsPhoto[]>([]);

  const { changeAlert } = useAlert();
  const { openPhoto, closePhoto } = useModal();

  async function handleSortImage(list: PropsPhoto[]) {
    await api
      .put(`/immobiles/photos/sort`, list)
      .then(() => setPhotoModal(list));
  }

  async function handleDeleteImage(item: PropsPhoto) {
    if (!confirm(`Você deseja excluir?`)) return;

    await api
      .delete(`/immobiles/${item.id}/photos`)
      .then(() =>
        setPhotoModal(photos.filter((f: { id: string }) => f.id !== item.id)),
      );
  }

  async function handleUploadFile(event: ChangeEvent) {
    const formData = new FormData();

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    for (const file of files) {
      formData.append("photo", file);
    }

    await api.patch(`/immobiles/${immobleId}/photos`, formData).catch(() =>
      changeAlert({
        message: "Não foi possivel conectar ao servidor.",
      }),
    );

    await api
      .get(`/immobiles/${immobleId}`)
      .then(async resp => {
        const respImmoble: PropsImmobles = await resp.data;
        const photoData = respImmoble?.photos || [];
        setPhotoModal(photoData);
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }

  useEffect(() => {
    setPhotoModal(photos);
  }, [photos]);

  console.log("start", photoModal);

  return (
    <div className={`${openPhoto ? "" : "hidden"} modal`}>
      <div className="modal-content max-w-5xl">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closePhoto(!openPhoto)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Photos{" "}
              <input
                type="file"
                className="input-file"
                multiple
                onChange={handleUploadFile}
              />
            </h3>
            <ReactSortable
              list={photoModal}
              setList={setPhotoModal}
              className="flex flex-wrap mb-6 "
              tag="ul"
            >
              {photoModal.map((item, index) => (
                <li id={item.id} key={index} className="w-full md:w-4/12 p-2">
                  <section className="relative border p-3">
                    <img
                      className="object-cover"
                      src={item.image_lg}
                      alt={item.image_xs}
                    />
                    <button
                      className="btn-danger absolute top-0 right-0"
                      onClick={() => handleDeleteImage(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </section>
                </li>
              ))}
            </ReactSortable>
          </div>
        </div>
      </div>
    </div>
  );
}
