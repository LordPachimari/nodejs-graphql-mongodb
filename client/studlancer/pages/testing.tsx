import {
  TextInput,
  Box,
  Card,
  Text,
  Menu,
  Button,
  SegmentedControl,
  RadioGroup,
  Radio,
  Chips,
  Chip,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { response } from "express";
import { useEffect, useRef, useState } from "react";
import { isCommaListExpression, NumberLiteralType } from "typescript";
import {
  testStore,
  Annotations,
  ContentBlock,
  RichText,
} from "../src/zus-stores/testStore";
import shallow from "zustand";
import compare from "zustand";
import { start } from "repl";
import {
  justBoldAnnotations,
  redTextAnnotations,
} from "../src/annotations/annotations";
import Document from "next/document";
import { convertNodeHttpToRequest } from "apollo-server-core";
import { nanoid } from "nanoid";
import { resizeImage } from "next/dist/server/image-optimizer";
import { styleTextContent } from "../src/utilities/styleTextContent";
import { textColor } from "../src/types/textStyleTypes";

const Testing = () => {
  const firstRender = testStore((state) => state.firstRender);
  const setFirstRenderFalse = testStore((state) => state.setFirstRenderFalse);
  const updateContent = testStore((state) => state.updateContent);
  const createFirstContentBlock = testStore(
    (state) => state.createFirstContentBlock
  );

  const text = testStore((state) => state.text);
  const setText = testStore((state) => state.setText);
  const content = testStore((state) => state.content);

  // content = structuredClone(serverContent);
  console.log("content", content);

  const createDivBlockOnEnter = () => {
    let blockId = nanoid();
    let selection = document.getSelection();
    let clonedRange = selection!.getRangeAt(0).cloneRange();

    let currentBlockId: string;
    clonedRange.commonAncestorContainer.parentElement?.nodeName === "DIV"
      ? (currentBlockId =
          clonedRange?.commonAncestorContainer.parentElement?.id!)
      : (currentBlockId =
          clonedRange?.commonAncestorContainer.parentElement?.parentElement
            ?.id!);

    let currentBlock = document.getElementById(currentBlockId);
    let newBlock = document.createElement("div");
    newBlock.className = "content-block";
    newBlock.id = blockId;
    newBlock.contentEditable = "true";
    newBlock.spellcheck = true;

    let span = document.createElement("span");
    span.className = "default-default";
    span.innerHTML = " ";

    newBlock.appendChild(span);
    currentBlock?.after(newBlock);

    let r = document.createRange();

    r.setStart(span, 0);
    r.setEnd(span, 0);
    selection?.removeAllRanges();
    selection?.addRange(r);
  };

  // let firstContentBlockId = "fuckyouIvan";
  // if (!firstRender) {
  //   firstContentBlockId = nanoid();
  // } else {
  //   firstContentBlockId = "fuckyouIvan";
  // }

  useEffect(() => {
    if (firstRender) {
      setFirstRenderFalse();
    } else {
      const timeOutId = setTimeout(() => updateContent(), 5000);
      return () => clearTimeout(timeOutId);
    }
  }, [text]);
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Button
        color="teal"
        onClick={() =>
          styleTextContent({ type: "text-color", textColor: "green" })
        }
      >
        green
      </Button>
      <Button
        color="red"
        onClick={() => {
          setText("1");
          styleTextContent({ type: "text-color", textColor: "red" });
        }}
      >
        red
      </Button>
      <Button
        onClick={() => {
          setText("1");
          styleTextContent({ type: "text-color", textColor: "blue" });
        }}
      >
        blue
      </Button>
      <Button
        onClick={() => {
          setText("1");
          styleTextContent({ type: "isBold", textColor: "fuckyouIvan" });
        }}
      >
        Bold
      </Button>

      <Box
        id="content"
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          setText(e.currentTarget.textContent!);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();

            createDivBlockOnEnter();
          }
          if (e.key === "Backspace") {
            let selection = document.getSelection()?.getRangeAt(0);

            if (
              selection?.commonAncestorContainer.parentElement?.id ===
                selection?.commonAncestorContainer.parentElement?.parentElement
                  ?.children[0].id &&
              selection?.commonAncestorContainer ===
                selection?.commonAncestorContainer.parentElement?.children[0] &&
              selection?.commonAncestorContainer.parentNode?.parentNode
                ?.parentNode?.childElementCount === 1
            ) {
              e.preventDefault();
            }
          }
        }}
        sx={(theme) => ({
          WebkitUserModify: "read-write-plaintext-only",
          ":focus": { outline: "none" },
          width: 800,
          minHeight: 600,
          background: theme.colors.teal[2],
        })}
      >
        <Box
          id="slfjsfjioesjf"
          mt={2}
          className="contenteditable-block"
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            setText(e.currentTarget.textContent!);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          contentEditable={true}
          suppressContentEditableWarning={true}
          placeholder="Untitled"
          spellCheck="true"
          sx={(theme) => ({
            display: "flex",
            background: theme.colors.teal[2],
            ":focus": { outline: "none" },
            minHeight: 20,
            whiteSpace: "pre-wrap",

            color: "black",

            fontFamily: "sans-serif",
            cursor: "text",
          })}
        >
          <span className="default-default"></span>
        </Box>
      </Box>
    </Box>
  );
};
export default Testing;
