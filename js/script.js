import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  lightboxContent: document.querySelector(".lightbox__content"),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxButton: document.querySelector(".lightbox__button"),
  galleryImage: document.querySelector(".gallery__image")
};
// console.log(refs.lightbox);
// console.log(refs.lightboxOverlay);
// console.log(refs.lightboxContent);
// console.log(refs.lightboxImage);
// console.log(refs.lightboxButton);

const galleryMarkupMaker = ({
  preview,
  original,
  description
}) => {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
};

const handleClickOnGallery = event => {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  refs.lightboxImage.setAttribute("src", event.target.dataset.source);
  refs.lightboxImage.setAttribute("alt", event.target.alt);
  refs.lightbox.classList.add("is-open");
};

const handleClickOnLightbox = event => {
  if (
    event.target === refs.lightboxButton ||
    event.target !== refs.lightboxImage
  ) {
    refs.lightbox.classList.replace(
      "is-open",
      refs.lightboxButton.dataset.action
    );
    refs.lightboxImage.removeAttribute("src");
    refs.lightboxImage.removeAttribute("alt");
  }
};

const handleKeyPress = event => {
  if (event.code === "Escape") {
    refs.lightbox.classList.replace(
      "is-open",
      refs.lightboxButton.dataset.action
    );
    refs.lightboxImage.removeAttribute("src");
    refs.lightboxImage.removeAttribute("alt");
  }

  if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
    const currentImage = refs.lightboxImage;
    // console.log(currentImage);
    if (!currentImage.hasAttribute("src")) {
      return;
    }

    const {
      src
    } = currentImage;
    // console.log(src);
    const arrayImg = Array.from(galleryItems);
    // console.log(arrayImg);
    let arrIndex = arrayImg.findIndex(elem => elem.original === src);
    if (arrIndex !== -1) {
      if (event.code === "ArrowRight") {
        arrIndex += 1;
        // console.log(arrIndex);
      };
      if (event.code === "ArrowLeft") {
        arrIndex -= 1;
        // console.log(arrIndex);
      };
      if (arrIndex <= 0) {
        arrIndex = 0;
        // console.log(arrIndex);
      };
      if (arrIndex <= 0 && event.code === "ArrowLeft") {
        arrIndex = arrayImg.length - 1;
        // console.log(arrIndex);
      };
      if (arrIndex >= arrayImg.length - 1) {
        arrIndex = arrayImg.length - 1;
        // console.log(arrIndex);
      };
      if (arrIndex >= arrayImg.length - 1 && event.code === "ArrowRight") {
        arrIndex = 0;
        // console.log(arrIndex);
      };


      refs.lightboxImage.removeAttribute("src");
      refs.lightboxImage.removeAttribute("alt");

      const {
        original,
        description
      } = arrayImg[arrIndex];

      // console.log(original);
      // console.log(description);
      // console.log(arrayImg[arrIndex]);

      refs.lightboxImage.setAttribute("src", original);
      refs.lightboxImage.setAttribute("alt", description);
    }
  }
};

const mappedGallery = galleryItems.map(galleryMarkupMaker).join("\n");

refs.gallery.insertAdjacentHTML("afterbegin", mappedGallery);

refs.gallery.addEventListener("click", handleClickOnGallery);

refs.lightbox.addEventListener("click", handleClickOnLightbox);

window.addEventListener("keydown", handleKeyPress);