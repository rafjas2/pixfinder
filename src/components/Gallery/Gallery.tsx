import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { type PixabayHit } from '@/types/pixabay';

interface GalleryProps {
  images: PixabayHit[];
}

export function Gallery({ images }: GalleryProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    selectedImage: PixabayHit | null;
  }>({
    isOpen: false,
    selectedImage: null,
  });

  if (!images || images.length === 0) {
    return null;
  }

  const showModal = (image: PixabayHit) => {
    setModalState({ isOpen: true, selectedImage: image });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, selectedImage: null });
  };

  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => showModal(image)}
            className="group relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-xl border-2 border-brand bg-surface shadow-glow transition-transform duration-300 ease-spring hover:scale-105 hover:shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <p className="text-sm font-medium text-white truncate">{image.tags}</p>
            </div>
            <span className="sr-only">View image details for {image.tags}</span>
          </button>
        ))}
      </div>

      {modalState.selectedImage && (
        <Modal
          isOpen={modalState.isOpen}
          image={modalState.selectedImage.largeImageURL}
          userImg={modalState.selectedImage.userImageURL}
          user={modalState.selectedImage.user}
          tags={modalState.selectedImage.tags}
          onClose={hideModal}
        />
      )}
    </section>
  );
}
