// Value in px. Used to properly determine scroll value when element is animated
const spaceBetweenItems = 4;

const scrollToTopOfElement = (elementID) => {
  const scrollToElement = document.getElementById(elementID);
  scrollToElement.scrollIntoView({ behavior: "smooth", block: "start" });
};

const scrollToBottomOfElement = (elementID) => {
  const scrollToElement = document.getElementById(elementID);
  scrollToElement.scrollIntoView({ behavior: "smooth", block: "end" });
};

const scrollToElement = (elementID, elementIndex = 0) => {
  const scrollElement = document.getElementById("accordion");
  const scrollToElement = document.getElementById(elementID);
  const { 
    top: accordionTop, 
    height: accordionHeight 
  } = scrollElement.getBoundingClientRect();
  const { 
    top: elementTop,
    height: elementHeight
  } = scrollToElement.getBoundingClientRect();
  const scrollDiff = elementTop - accordionTop;

  if (scrollDiff < 0) {
    scrollToTopOfElement(elementID);
  } else if (scrollDiff > accordionHeight - (2 * elementHeight)) {
    // If element is animated and height might change
    if (elementIndex) {
      // Scroll to the bottom of element's content
      const elementContentBottom = 
        (elementIndex + 2) * elementHeight + elementIndex * spaceBetweenItems;
      const scrollFromTop = elementContentBottom - accordionHeight;
      scrollElement.scrollTo({ 
        top: scrollFromTop,
        behavior: "smooth"
      });
    // Otherwise (height is known)
    } else {
      scrollToBottomOfElement(elementID);
    }
  }
};

export default scrollToElement;