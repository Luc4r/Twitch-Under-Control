// Value in px. Used to properly determine scroll value when element is animated
const SPACE_BETWEEN_ITEMS = 4;

const scrollTo = (
  id: string,
  position: ScrollLogicalPosition,
  behavior: ScrollBehavior = 'smooth',
) => {
  const scrollToElement = document.getElementById(id);

  scrollToElement?.scrollIntoView({ behavior, block: position });
};

const scrollToAccordionElement = (id: string, index: number = 0) => {
  const scrollElement = document.getElementById('accordion');
  const scrollTargetElement = document.getElementById(id);

  if (!scrollElement || !scrollTargetElement) {
    return;
  }

  const { top: accordionTop, height: accordionHeight } =
    scrollElement.getBoundingClientRect();
  const { top: elementTop, height: elementHeight } =
    scrollTargetElement.getBoundingClientRect();
  const scrollDiff = elementTop - accordionTop;

  if (scrollDiff < 0) {
    scrollTo(id, 'start');
  } else if (scrollDiff > accordionHeight - 2 * elementHeight) {
    // If element is animated and height might change
    if (index > 0) {
      // Scroll to the bottom of element's content
      const elementContentBottom =
        (index + 2) * elementHeight + index * SPACE_BETWEEN_ITEMS;
      const scrollFromTop = elementContentBottom - accordionHeight;
      scrollElement.scrollTo({
        top: scrollFromTop,
        behavior: 'smooth',
      });
      // Otherwise (height is known)
    } else {
      scrollTo(id, 'end');
    }
  }
};

export default scrollToAccordionElement;
