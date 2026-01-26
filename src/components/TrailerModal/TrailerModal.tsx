import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./TrailerModal.module.css";
import { Button } from "../Button/Buutton";
import { useMobile } from "../../hooks/useMoviListTop10";

interface TarailerModalProps {
  videoUrl: string;
  onClose: () => void;
}

export const TarailerModal = ({ videoUrl, onClose }: TarailerModalProps) => {
  const isMobile = useMobile();
  // Закрытие по нажатию на ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    // Блокируем скролл основной страницы при открытой модалке
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const getEmbedUrl = (inputUrl: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = inputUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  if (!embedUrl) return <p>Ошибка: Некорректная ссылка на видео</p>;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.btn__cross}>
          <Button
            onClick={onClose}
            variant={!isMobile ? "cross" : "crossnotborder"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                fill="black"
              />
            </svg>
          </Button>
        </div>
        <div className={styles.videoContainer}>
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>,
    document.body,
  );
};
