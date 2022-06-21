import { StringLiteralLike } from "typescript";
import create from "zustand";
import { nanoid } from "nanoid";
import produce from "immer";
import {
  justBoldAnnotations,
  redTextAnnotations,
} from "../annotations/annotations";
import { convertNodeHttpToRequest } from "apollo-server-core";

export type Annotations = {
  bold: string;
  textColor: string;
};

export interface RichText {
  text: string;
  annotations: Annotations;
}
export interface ContentBlock {
  id: string;
  rich_text: RichText[];
}
interface testState {
  firstRender: boolean;
  text: string;
  setText: (text: string) => void;
  setFirstRenderFalse: () => void;
  content: ContentBlock[];

  createFirstContentBlock: () => void;

  updateContent: () => void;
}
interface contentElementAndItsPosition {
  contentElement: Element;
  position: number;
}
const turnChildElementIntoContentBlock = (child: Element): ContentBlock => {
  let newContentBlock: ContentBlock;

  let childrenLength = child.children.length;

  newContentBlock = { id: child.id, rich_text: [] };
  for (let i = 0; i < childrenLength; i++) {
    let rich_text: RichText;
    let classNameValues = child.children[i].className.split("-");

    rich_text = {
      text: child.children[i].textContent!,
      annotations: { bold: classNameValues[0], textColor: classNameValues[1] },
    };
    newContentBlock.rich_text.push(rich_text);
  }
  return newContentBlock;
};
const contentBlockIdsToDelete = (
  htmlElement: HTMLElement,
  array2: ContentBlock[]
): string[] => {
  let contentBlockIds: string[] = [];
  let copyOfHtmlElement = htmlElement.cloneNode(true);

  let i = 0;
  for (let i = 0; i < array2.length; i++) {
    let z = 0;

    console.log("to delete");
    if (copyOfHtmlElement.childNodes.length === 0) {
      contentBlockIds.push(array2[i].id);
    } else {
      while (z < copyOfHtmlElement.childNodes.length) {
        console.log("i", i);
        console.log("z", z);

        if (
          array2[i].id ===
          copyOfHtmlElement.childNodes[z].childNodes[0].parentElement?.id
        ) {
          console.log("yes");
          copyOfHtmlElement.childNodes[z].remove();
          // z = htmlElement.children.length;
          break;
        } else {
          console.log("no");
          if (z === copyOfHtmlElement.childNodes.length - 1) {
            // let idAndItsPosition: idAndItsPosition = {
            //   id: array2[i].id,
            //   position: i,
            // };
            // contentBlockIds.push(idAndItsPosition);
            contentBlockIds.push(array2[i].id);
            // z = htmlElement.children.length;
            break;
          } else {
            z++;
          }
        }
      }
    }
  }
  return contentBlockIds;
};
const contentBlocksToInsertFunction = (
  htmlElement: HTMLElement,
  array2: ContentBlock[]
): { contentBlock: ContentBlock; position: number }[] => {
  // let copyOfArray = array2;
  let copyOfArray = structuredClone(array2);
  let contentBlocksAndItsPositions: {
    contentBlock: ContentBlock;
    position: number;
  }[] = [];
  let i = 0;

  for (let i = 0; i < htmlElement.children.length!; i++) {
    let z = 0;

    console.log("to insert");
    if (copyOfArray.length === 0) {
      let contentBlockAndItsPosition = {
        contentBlock: turnChildElementIntoContentBlock(htmlElement.children[i]),

        position: i,
      };
      contentBlocksAndItsPositions.push(contentBlockAndItsPosition);
      // contentBlockIds.push(htmlElement.children[i].id);
    } else {
      while (z < copyOfArray.length) {
        console.log("i", i);
        console.log("z", z);

        if (htmlElement.children[i].id === copyOfArray[z].id) {
          //
          console.log("first scenario");
          copyOfArray.splice(z, 1); //
          // z = array2.length;
          break;
        } else {
          console.log("second dcenarion");
          if (z === copyOfArray.length - 1) {
            //
            let contentBlockAndItsPosition = {
              contentBlock: turnChildElementIntoContentBlock(
                htmlElement.children[i]
              ),
              position: i,
            };
            contentBlocksAndItsPositions.push(contentBlockAndItsPosition);
            // contentBlockIds.push(htmlElement.children[i].id);
            // z = array2.length;
            break;
          } else {
            z++;
          }
        }
      }
    }
  }
  return contentBlocksAndItsPositions;
};
const contentBlocksToUpdateFunction = (
  htmlElement: HTMLElement,
  array2: ContentBlock[]
): ContentBlock[] => {
  // let copyOfArray = array2;

  console.log("to update");
  let contentBlocks: ContentBlock[] = [];
  let i = 0;
  for (let i = 0; i < htmlElement.children.length!; i++) {
    let z = 0;
    let breakTheLoop: boolean = false;

    while (z < array2.length) {
      console.log("i", i); //loop think about it
      console.log("z", z);

      if (array2.length === 0) {
        //
        console.log("undefined");
        breakTheLoop = true;

        // z = array2.length;
      } else if (
        htmlElement.children[i].id === array2[z].id
        //
      ) {
        let contentIsDifferent = false;
        let contentsLengthIsDifferent =
          htmlElement.children[i].children.length !==
          array2[z].rich_text.length;

        let a = 0;
        while (a < htmlElement.children[i].children.length) {
          let classNameValues =
            htmlElement.children[i].children[a].className.split("-");
          if (
            htmlElement.children[i].children[a].textContent !==
              array2[z].rich_text[a].text ||
            classNameValues[0] !== array2[z].rich_text[a].annotations.bold ||
            classNameValues[1] !== array2[z].rich_text[a].annotations.textColor
          ) {
            console.log("scenario 1");

            contentIsDifferent = true;
            break;
          } else {
            console.log("scenario 2");
            a++;
          }
        }
        // console.log("is content different", contentIsDifferent);
        if (contentsLengthIsDifferent || contentIsDifferent) {
          let contentBlock = turnChildElementIntoContentBlock(
            htmlElement.children[i]
          );

          contentBlocks.push(contentBlock);

          // z = array2.length;
          break;
        }
        z++;
      } else {
        z++;
      }
    }
    if (breakTheLoop) {
      break;
    }
  }
  return contentBlocks;
};

let blockId = nanoid();
export const testStore = create<testState>((set, get) => ({
  firstRender: true,
  setFirstRenderFalse: () => set({ firstRender: false }),
  text: "",

  setText: (text) => set({ text: text }),
  createFirstContentBlock: () =>
    set({
      content: [
        {
          id: blockId,
          rich_text: [
            {
              text: "",
              annotations: { bold: "default", textColor: "default" },
            },
          ],
        },
      ],
    }),
  content: [
    {
      id: blockId,
      rich_text: [
        { text: "", annotations: { bold: "default", textColor: "default" } },
      ],
    },
  ],

  updateContent: () =>
    set(
      produce((state: testState) => {
        console.log("updating content...");

        let content = document.getElementById("content");

        let supposeServerContent = get().content;

        if (supposeServerContent.length === 0) {
          console.log("content length is 0");
          let contentBlockToInsert: ContentBlock[] = [];
          for (let i = 0; i < content?.children.length!; i++) {
            let newContentBlock = turnChildElementIntoContentBlock(
              content?.children[i]!
            );
            contentBlockToInsert.push(newContentBlock);
          }
          console.log("content blocks to insert", contentBlockToInsert);
        } else {
          let contentBlocksToInsert = contentBlocksToInsertFunction(
            content!,
            supposeServerContent
          );
          let idsToDelete = contentBlockIdsToDelete(
            content!,
            supposeServerContent
          );
          let contentBlocksToUpdate = contentBlocksToUpdateFunction(
            content!,
            supposeServerContent
          );
          console.log("content blocks to insert", contentBlocksToInsert);
          console.log("content blocks to update", contentBlocksToUpdate);
          console.log("idstoDelete", idsToDelete);

          let contentBlocks = get().content;
          let newContentBlocks: ContentBlock[] = [];
          if (contentBlocksToUpdate.length !== 0) {
            console.log("updation");

            for (let i = 0; i < contentBlocksToUpdate.length; i++) {
              console.log("works", contentBlocksToUpdate);
              contentBlocks.forEach((c) =>
                c.id === contentBlocksToUpdate[i].id
                  ? (c.rich_text = contentBlocksToUpdate[i].rich_text)
                  : {}
              );
            }
          }
          if (idsToDelete.length !== 0) {
            console.log("deletion");
            newContentBlocks = contentBlocks.filter(
              (c) => !idsToDelete.includes(c.id)
            );
            console.log("new content blocks after deletion", newContentBlocks);
          }
          if (contentBlocksToInsert.length !== 0) {
            console.log("insertion");

            for (let i = 0; i < contentBlocksToInsert.length; i++) {
              console.log("part2");
              if (idsToDelete.length !== 0) {
                newContentBlocks.splice(
                  contentBlocksToInsert[i].position,
                  0,
                  contentBlocksToInsert[i].contentBlock
                );
              } else {
                console.log("position", contentBlocksToInsert[i].position);
                contentBlocks.splice(
                  contentBlocksToInsert[i].position,
                  0,
                  contentBlocksToInsert[i].contentBlock
                );
              }
            }
          }
          console.log("new content blocks", newContentBlocks);
          if (idsToDelete.length !== 0) {
            console.log("setting new content blocks");
            state.content = newContentBlocks;
          } else {
            console.log("setting content blocks");
            console.log("content blocks", contentBlocks);
            state.content = contentBlocks;
          }
        }
      })
    ),
}));
