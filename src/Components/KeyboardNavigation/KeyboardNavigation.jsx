import React, { useEffect, useState, useRef } from "react";

const KeyboardNavigation = ({ children }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements) return;

      const maxIndex = focusableElements.length - 1;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const currentRect =
              focusableElements[prev]?.getBoundingClientRect();
            if (!currentRect) return prev;

            let closestAbove = null;
            let minDistance = Infinity;

            for (let i = 0; i < focusableElements.length; i++) {
              if (i === prev) continue;
              const rect = focusableElements[i].getBoundingClientRect();
              if (rect.bottom <= currentRect.top) {
                const distance = Math.abs(rect.left - currentRect.left);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestAbove = i;
                }
              }
            }

            return closestAbove !== null ? closestAbove : prev;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const currentRect =
              focusableElements[prev]?.getBoundingClientRect();
            if (!currentRect) return prev;

            let closestBelow = null;
            let minDistance = Infinity;

            for (let i = 0; i < focusableElements.length; i++) {
              if (i === prev) continue;
              const rect = focusableElements[i].getBoundingClientRect();
              if (rect.top >= currentRect.bottom) {
                const distance = Math.abs(rect.left - currentRect.left);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestBelow = i;
                }
              }
            }

            return closestBelow !== null ? closestBelow : prev;
          });
          break;
        case "Enter":
          focusableElements[focusedIndex]?.click();
          break;
        case "Escape":
          setFocusedIndex(-1);
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex]);

  useEffect(() => {
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusedIndex >= 0) {
      focusableElements[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  return <div ref={containerRef}>{children}</div>;
};

export default KeyboardNavigation;
