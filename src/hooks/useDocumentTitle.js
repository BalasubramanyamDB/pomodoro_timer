import { useEffect } from "react";

function useDocumentTitle(titleName) {
  useEffect(() => {
    document.title = titleName;
  });
}

export { useDocumentTitle };
