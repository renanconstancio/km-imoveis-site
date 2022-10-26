import { useModal } from "../../hooks/use-modal";
import { PropsImmobles, PropsPhoto } from "../../global/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/api";

type PropsModal = {
  immobleId: string | null;
  addPhotos: PropsPhoto[];
};

export default function ModalPhoto({ immobleId, addPhotos }: PropsModal) {
  const { changeAlert } = useAlert();
  const { openPhoto, closePhoto } = useModal();
  const [photos, setPhotoModal] = useState<PropsPhoto[]>([]);
  const [endEvent, setEndEvent] = useState<boolean>(false);

  async function handleSortImage(listSort: PropsPhoto[]) {
    console.log("before", listSort);
    setPhotoModal(listSort);
    if (endEvent) await api.put(`/immobiles/photos/sort`, listSort);
    console.log("after", listSort);
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

    await api
      .patch(`/immobiles/${immobleId}/photos`, formData)
      .then(async ({ data, status }) => {
        console.log(data);
        if (immobleId && status === 200) setPhotoModal(data.photos);
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }

  useEffect(() => {
    setPhotoModal(addPhotos);
  }, [addPhotos]);

  console.log("start", photos);

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
              Fotos{" "}
              <input
                type="file"
                className="input-file"
                multiple
                onChange={handleUploadFile}
              />
            </h3>
            <ReactSortable
              list={photos}
              setList={handleSortImage}
              onEnd={() => setEndEvent(!endEvent)}
              className="flex flex-wrap mb-6 "
              tag="ul"
            >
              {photos.map((item, index) => (
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
