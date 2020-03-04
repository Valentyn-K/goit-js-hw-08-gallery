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

const galleryMarkupMaker = ({
  preview,
  lazy,
  original,
  description
}) => {
  const galleryItem = document.createElement("li");
  galleryItem.setAttribute("class", "gallery__item");
  const galleryLink = document.createElement("a");
  galleryLink.setAttribute("href", `${original}`);
  galleryLink.setAttribute("class", "gallery__link");
  const galleryImage = document.createElement("img");
  galleryImage.setAttribute("class", "gallery__image");
  galleryImage.setAttribute("src", `${preview}`);
  galleryImage.setAttribute("data-source", `${lazy}`);
  galleryImage.setAttribute("data-lazy", `${original}`);
  galleryImage.setAttribute("alt", `${description}`);
  galleryItem.append(galleryLink, galleryImage);
  console.log(galleryItem);
  refs.gallery.appendChild(galleryItem);
};
const mappedGallery = galleryItems.map(galleryMarkupMaker);
console.log(mappedGallery);


const handleClickOnGallery = event => {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  };
  console.log("currentTarget", event.currentTarget);
  console.log("event.target", event.target);

  console.log("event.target.dataset.source", event.target.dataset.source);
  console.log("event.target.alt", event.target.alt);

  refs.lightboxImage.setAttribute("src", event.target.dataset.source);
  refs.lightboxImage.setAttribute("alt", event.target.alt);
  refs.lightbox.classList.add("is-open");
};

const lazyLoad = target => {
  const options = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const imageUrl = img.dataset.lazy;

        img.setAttribute('src', imageUrl);
        img.classList.add('fade-in');

        observer.disconnect();
      }
    });
  }, options);

  io.observe(target);
};

const images = document.querySelectorAll('.gallery__item img');

images.forEach(image => {
  lazyLoad(image);
});



// const handleClickOnLightbox = event => {
//   if (
//     event.target === refs.lightboxButton ||
//     event.target !== refs.lightboxImage
//   ) {
//     refs.lightbox.classList.replace(
//       "is-open",
//       refs.lightboxButton.dataset.action
//     );
//     refs.lightboxImage.removeAttribute("src");
//     refs.lightboxImage.removeAttribute("alt");
//   }
// };

// const handleKeyPress = event => {
//   if (event.code === "Escape") {
//     refs.lightbox.classList.replace(
//       "is-open",
//       refs.lightboxButton.dataset.action
//     );
//     refs.lightboxImage.removeAttribute("src");
//     refs.lightboxImage.removeAttribute("alt");
//   }

//   if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
//     const currentImage = refs.lightboxImage;
//     console.log(currentImage);
//     if (!currentImage.hasAttribute("src")) {
//       return;
//     }

//     const {
//       src
//     } = currentImage;
//     console.log(src);
//     const arrayImg = Array.from(galleryItems);
//     console.log(arrayImg);
//     let arrIndex = arrayImg.findIndex(elem => elem.original === src);
//     if (arrIndex !== -1) {
//       if (event.code === "ArrowRight") {
//         arrIndex += 1;
//         console.log(arrIndex);
//       };
//       if (event.code === "ArrowLeft") {
//         arrIndex -= 1;
//         console.log(arrIndex);
//       };
//       if (arrIndex <= 0) {
//         arrIndex = 0;
//         console.log(arrIndex);
//       };
//       if (arrIndex <= 0 && event.code === "ArrowLeft") {
//         arrIndex = arrayImg.length - 1;
//         console.log(arrIndex);
//       };
//       if (arrIndex >= arrayImg.length - 1) {
//         arrIndex = arrayImg.length - 1;
//         console.log(arrIndex);
//       };
//       if (arrIndex >= arrayImg.length - 1 && event.code === "ArrowRight") {
//         arrIndex = 0;
//         console.log(arrIndex);
//       };


//       refs.lightboxImage.removeAttribute("src");
//       refs.lightboxImage.removeAttribute("alt");

//       const {
//         original,
//         description
//       } = arrayImg[arrIndex];

//       console.log(original);
//       console.log(description);
//       console.log(arrayImg[arrIndex]);

//       refs.lightboxImage.setAttribute("src", original);
//       refs.lightboxImage.setAttribute("alt", description);
//     }
//   }
// };

// refs.gallery.addEventListener("click", handleClickOnGallery);

// refs.lightbox.addEventListener("click", handleClickOnLightbox);

// window.addEventListener("keydown", handleKeyPress);