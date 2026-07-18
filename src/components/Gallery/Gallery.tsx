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
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => showModal(image)}
            aria-label={`View photo by ${image.user}`}
            className="group border-brand bg-surface shadow-glow ease-spring hover:shadow-card focus-visible:ring-brand relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <img
              src={image.webformatURL}
              alt=""
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              loading={index < 4 ? 'eager' : 'lazy'}
              {...(index < 2 ? { fetchPriority: 'high' as const } : {})}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <p className="truncate text-sm font-medium text-white">
                By {image.user}
              </p>
            </div>
          </button>
        ))}
      </div>

      {modalState.selectedImage && (
        <Modal
          isOpen={modalState.isOpen}
          image={modalState.selectedImage.largeImageURL}
          userImg={modalState.selectedImage.userImageURL}
          user={modalState.selectedImage.user}
          onClose={hideModal}
        />
      )}
    </section>
  );
}
