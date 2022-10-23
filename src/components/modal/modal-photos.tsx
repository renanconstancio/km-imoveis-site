import { useModal } from "../../hooks/use-modal";
import { PropsImmobles, PropsPhoto } from "../../global/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { api } from "../../api/api";

type PropsModal = {
  immobleId: string | undefined;
  addPhotos?: (data: PropsPhoto[]) => void;
};

export default function ModalPhoto({ immobleId, addPhotos }: PropsModal) {
  const [photos, setPhoto] = useState<PropsPhoto[]>();
  const { openPhoto, closePhoto } = useModal();
  const { changeAlert } = useAlert();

  async function handleUploadFile(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;

    const formData = new FormData();
    for (const key of Object.keys(file)) {
      formData.append("photo", file[Number(key)]);
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
        const photoData = respImmoble?.photos;
        setPhoto(photoData);
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }

  useEffect(() => {
    (async () => {
      if (!immobleId) return;
      await api
        .get(`/immobiles/${immobleId}`)
        .then(async resp => {
          const respImmoble: PropsImmobles = await resp.data;
          const photoData = respImmoble?.photos;
          setPhoto(photoData);
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel conectar ao servidor.",
          }),
        );
    })();
  }, [openPhoto, immobleId, changeAlert]);

  return (
    <div className={`${openPhoto ? "" : "hidden"} modal`}>
      <div className="modal-content max-w-5xl">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closePhoto(!openPhoto)}
          >
            <i className="fas fa-times text-lg"></i>
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
            <div className="space-y-6">
              <div className="flex flex-wrap -mx-3 mb-6">
                {photos?.map(item => (
                  <div key={item.id} className="w-full md:w-4/12 p-4">
                    <img
                      className="object-cover"
                      src={item.image_xs}
                      alt={item.image_xs}
                    />
                  </div>
                ))}
              </div>
              {/* <button className="btn-primary" type="submit">
                Salvar
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
