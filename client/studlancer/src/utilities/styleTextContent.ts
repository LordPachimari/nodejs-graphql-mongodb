interface styleTextContentProps {
  type: "text-color" | "isBold";
  textColor: string;
}
export const styleTextContent = ({
  type,
  textColor,
}: styleTextContentProps) => {
  let selection = document.getSelection();
  if (!selection) {
    return;
  }
  // console.log("selection", selection);

  for (let i = 0; i < selection.rangeCount; i++) {
    let range = selection.getRangeAt(i);
    console.log("range", range);
    if (!range) {
      return;
    }

    if (range.commonAncestorContainer.childNodes.length === 0) {
      console.log("first big scenario");

      let selectedText = range.cloneContents().textContent;
      let className = range.commonAncestorContainer.parentElement?.className;
      let classNameValues = className?.split("-");
      let newClassName: string;
      if (type === "isBold") {
        classNameValues![0] === "bold"
          ? (newClassName = `default-${classNameValues![1]}`)
          : (newClassName = `bold-${classNameValues![1]}`);
      } else {
        if (classNameValues![1] === textColor) {
          return;
        }
        newClassName = `${classNameValues![0]}-${textColor}`;
      }

      let newSpan = document.createElement("span");

      newSpan.className = newClassName;
      newSpan.innerHTML = selectedText!;
      let startOffset = range.startOffset;
      let endOffset = range.endOffset;
      let textContent = range.commonAncestorContainer.textContent;
      let textContentLength = range.commonAncestorContainer.textContent?.length;

      if (startOffset === 0 && endOffset === textContentLength) {
        range.commonAncestorContainer.parentElement?.classList.remove(
          className!
        );

        range.commonAncestorContainer.parentElement?.classList.add(
          newClassName
        );
      } else if (startOffset === 0) {
        console.log("1 first scenario");
        let text1 = textContent?.substring(endOffset, textContentLength);
        let span1 = document.createElement("span");
        span1.className = className!;
        span1.innerHTML = text1!;
        range.commonAncestorContainer.parentElement?.after(span1);
        range.commonAncestorContainer.parentElement?.after(newSpan);
        range.commonAncestorContainer.parentElement?.remove();
      } else if (endOffset === textContentLength) {
        console.log("1 second scenario");
        let text2 = textContent?.substring(0, startOffset);
        let span2 = document.createElement("span");
        span2.className = className!;
        span2.innerHTML = text2!;
        range.commonAncestorContainer.parentElement?.after(newSpan);
        range.commonAncestorContainer.parentElement?.after(span2);
        range.commonAncestorContainer.parentElement?.remove();
      } else {
        console.log("1 third scenario");
        let text1 = textContent?.substring(0, startOffset);
        let span1 = document.createElement("span");
        span1.className = className!;
        span1.innerHTML = text1!;
        let text2 = textContent?.substring(endOffset, textContentLength);
        let span2 = document.createElement("span");
        span2.className = className!;
        span2.innerHTML = text2!;
        range.commonAncestorContainer.parentElement?.after(span2);
        range.commonAncestorContainer.parentElement?.after(newSpan);
        range.commonAncestorContainer.parentElement?.after(span1);
        range.commonAncestorContainer.parentElement?.remove();
      }
      const childNodesClones = range.commonAncestorContainer.cloneNode(true);
      const childNodesClonesLength =
        range.commonAncestorContainer.parentElement?.parentElement?.children
          .length!;
    } else if (
      range.commonAncestorContainer.childNodes[0].parentElement?.id !==
      "content"
    ) {
      console.log("second big scenario");

      let clonedContents = range.cloneContents();
      let contentsLenght = clonedContents.children.length;
      let contentsAlreadyHasTheColor: number = 0;
      if (type === "isBold") {
        for (let i = 0; i < contentsLenght; i++) {
          let classNameValues = clonedContents.children[i].className.split("-");
          classNameValues[0] === "bold"
            ? (clonedContents.children[
                i
              ].className = `default-${classNameValues[1]}`)
            : (clonedContents.children[
                i
              ].className = `bold-${classNameValues[1]}`);
        }
      } else {
        for (let i = 0; i < contentsLenght; i++) {
          let classNameValues = clonedContents.children[i].className.split("-");
          classNameValues[1] === textColor
            ? (contentsAlreadyHasTheColor = contentsAlreadyHasTheColor + 1)
            : (clonedContents.children[
                i
              ].className = `${classNameValues[0]}-${textColor}`);
        }
      }
      if (contentsAlreadyHasTheColor === contentsLenght) {
        return;
      }
      range.deleteContents();
      range.insertNode(clonedContents);

      const childNodesClones = range.commonAncestorContainer.cloneNode(true);
      const childNodesClonesLength =
        range.commonAncestorContainer.childNodes.length;

      let textContent = "";
      for (let i = childNodesClonesLength - 1; i >= 0; i--) {
        if (childNodesClones.childNodes[i].childNodes[0].textContent === "") {
          range.commonAncestorContainer.childNodes[i].remove();
        } else if (i === 0) {
          textContent === ""
            ? {}
            : (range.commonAncestorContainer.childNodes[0].textContent =
                range.commonAncestorContainer.childNodes[0].textContent +
                textContent);
        } else if (
          childNodesClones.childNodes[i].childNodes[0].parentElement
            ?.className ===
          childNodesClones.childNodes[i - 1].childNodes[0].parentElement
            ?.className
        ) {
          textContent === ""
            ? (textContent = childNodesClones.childNodes[i].textContent!)
            : (textContent =
                childNodesClones.childNodes[i].textContent + textContent);
          range.commonAncestorContainer.childNodes[i].remove();
        } else {
          textContent === ""
            ? {}
            : (range.commonAncestorContainer.childNodes[i].textContent =
                range.commonAncestorContainer.childNodes[i].textContent +
                textContent);
          textContent = "";
        }
      }
    } else {
      console.log("third big scenario");
      let clonedContents = range.cloneContents();
      let contentsLenght = clonedContents.children.length;
      let contentsAlreadyHasTheColor: number = 0;
      let allContentsLength: number = 0;
      for (let i = 0; i < contentsLenght; i++) {
        allContentsLength =
          allContentsLength + clonedContents.children[i].childElementCount;
        if (type === "isBold") {
          for (let z = 0; z < clonedContents.children[i].children.length; z++) {
            let classNameValues =
              clonedContents.children[i].children[z].className.split("-");
            classNameValues[0] === "bold"
              ? (clonedContents.children[i].children[
                  z
                ].className = `default-${classNameValues[1]}`)
              : (clonedContents.children[i].children[
                  z
                ].className = `bold-${classNameValues[1]}`);
          }
        } else {
          for (let z = 0; z < clonedContents.children[i].children.length; z++) {
            let classNameValues =
              clonedContents.children[i].children[z].className.split("-");
            classNameValues[1] === textColor
              ? (contentsAlreadyHasTheColor = contentsAlreadyHasTheColor + 1)
              : (clonedContents.children[i].children[
                  z
                ].className = `${classNameValues[0]}-${textColor}`);
          }
        }
      }
      if (
        contentsAlreadyHasTheColor === allContentsLength - 1 ||
        contentsAlreadyHasTheColor === allContentsLength
      ) {
        return;
      }
      range.deleteContents();
      range.insertNode(clonedContents);

      const childNodesClones = range.commonAncestorContainer.cloneNode(true);

      const childNodesClonesLength = childNodesClones.childNodes.length;

      let childNodes: Node | null = null;
      for (let i = childNodesClonesLength - 1; i >= 0; i--) {
        if (i === 0) {
          if (childNodes === null) {
            {
            }
          } else {
            for (let z = 0; z < childNodes.childNodes.length; z++) {
              let copyChildNodes = childNodes.cloneNode(true);
              childNodes.childNodes[z].childNodes[0].textContent === ""
                ? {}
                : range.commonAncestorContainer.childNodes[i].appendChild(
                    copyChildNodes.childNodes[z]
                  );
            }
            if (
              range.commonAncestorContainer.childNodes[i].childNodes[0]
                .textContent === ""
            ) {
              range.commonAncestorContainer.childNodes[
                i
              ].childNodes[0].remove();
            }

            childNodes = null;
          }
        } else if (
          childNodesClones.childNodes[i].childNodes[0].parentElement?.id ===
          childNodesClones.childNodes[i - 1].childNodes[0].parentElement?.id
        ) {
          if (childNodes === null) {
            childNodes = childNodesClones.childNodes[i];
          } else {
            for (
              let z = 0;
              z < childNodesClones.childNodes[i].childNodes.length;
              z++
            ) {
              let childNodesCopy = childNodesClones.cloneNode(true);

              childNodes.appendChild(
                childNodesCopy.childNodes[i].childNodes[z]
              );
            }
          }
          range.commonAncestorContainer.childNodes[i].remove();
        } else {
          if (childNodes === null) {
            {
            }
          } else {
            for (let z = 0; z < childNodes.childNodes.length; z++) {
              let copyChildNodes = childNodes.cloneNode(true);
              childNodes.childNodes[z].childNodes[0].textContent === ""
                ? {}
                : range.commonAncestorContainer.childNodes[i].appendChild(
                    copyChildNodes.childNodes[z]
                  );
            }
            if (
              range.commonAncestorContainer.childNodes[i].childNodes[0]
                .textContent === ""
            ) {
              range.commonAncestorContainer.childNodes[
                i
              ].childNodes[0].remove();
            }
            childNodes = null;
          }
        }
      }
      const anotherCopy = range.commonAncestorContainer.cloneNode(true);
      const anotherCopyLength = anotherCopy.childNodes.length;
      for (let i = 0; i < anotherCopyLength; i++) {
        let textContent = "";
        for (
          let z = anotherCopy.childNodes[i].childNodes.length - 1;
          z >= 0;
          z--
        ) {
          if (z === 0) {
            textContent === ""
              ? {}
              : (range.commonAncestorContainer.childNodes[
                  i
                ].childNodes[0].textContent =
                  range.commonAncestorContainer.childNodes[i].childNodes[0]
                    .textContent + textContent);
          } else if (
            anotherCopy.childNodes[i].childNodes[z].childNodes[0].parentElement
              ?.className ===
            anotherCopy.childNodes[i].childNodes[z - 1].childNodes[0]
              .parentElement?.className
          ) {
            textContent === ""
              ? (textContent =
                  anotherCopy.childNodes[i].childNodes[z].textContent!)
              : (textContent =
                  anotherCopy.childNodes[i].childNodes[z].textContent +
                  textContent);
            range.commonAncestorContainer.childNodes[i].childNodes[z].remove();
          } else {
            textContent === ""
              ? {}
              : (range.commonAncestorContainer.childNodes[i].childNodes[
                  z
                ].textContent =
                  anotherCopy.childNodes[i].childNodes[z].textContent +
                  textContent);
            textContent = "";
          }
        }
      }
    }
  }
};
