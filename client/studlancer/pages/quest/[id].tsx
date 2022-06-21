import { TextInput, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  DemoQuest,
  DemoQuestDocument,
  useDemoQuestQuery,
  useRedactDemoQuestMutation,
} from "../../src/generated/graphql";
import { demoQuestStore } from "../../src/zus-stores/demoQuestStore";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from "urql";

interface _DemoQuest {
  props: { demoQuest: { _id: string; title: string } };
}

const Quest: React.FC<_DemoQuest> = ({ props }) => {
  const router = useRouter();

  const { id } = router.query;

  const _id = id?.toString();
  const [{ data }] = useDemoQuestQuery({ variables: { _id: _id! } });
  const [, redactQuest] = useRedactDemoQuestMutation();

  const title = demoQuestStore((state) => state.title);
  const setTitle = demoQuestStore((state) => state.setTitle);
  const firstRender = demoQuestStore((state) => state.firstRender);
  const setFirstRenderFalse = demoQuestStore(
    (state) => state.setFirstRenderFalse
  );

  useEffect(() => {
    if (firstRender) {
      setFirstRenderFalse();
    } else {
      const timeOutId = setTimeout(
        () => redactQuest({ _id: _id!, title: title }),
        5000
      );
      return () => clearTimeout(timeOutId);
    }
  }, [title]);
  console.log(firstRender);

  console.log("title", title);
  console.log("serverData", data?.demoQuest.title);

  return (
    <Box
      contentEditable="true"
      onInput={(e: React.FormEvent<HTMLDivElement>) => {
        setTitle(e.currentTarget.textContent!);
      }}
      suppressContentEditableWarning={true}
      placeholder="Untitled"
      spellCheck="true"
      id="blockId"
      sx={(theme) => ({
        background: "transparent",
        ":focus": { outline: "none" },

        width: "100%",
        whiteSpace: "pre-wrap",
        // wordBreak: "break-word",
        // WebkitUserModify: "read-write",
        // overflowWrap: "break-word",
        // WebkitLineBreak: "normal",
        // caretColor: "black",
        // WebkitTapHighlightColor: "transparent",
        color: "black",
        fontWeight: 700,
        lineHeight: 1.2,
        fontSize: 40,
        fontFamily: "sans-serif",
        cursor: "text",
      })}
    >
      {data?.demoQuest.title}
    </Box>
    // <TextInput
    //   value={title}
    //   onChange={(event) => setTitle(event.currentTarget.value)}
    // />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "http://localhost:4000/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: () => {
        return {
          credentials: "include",
        };
      },
    },
    false
  );
  await client?.query(DemoQuestDocument, { _id: id }).toPromise();

  // const [{ data }] = useDemoQuestQuery({ variables: { _id: _id! } });
  const showthefuckingdata = ssrCache.extractData;
  console.log("showthefuckingdata", showthefuckingdata);
  return {
    props: { urqlState: ssrCache.extractData() },
  };
};

export default withUrqlClient(
  (ssr) => ({
    url: "http://localhost:4000/graphql",
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(Quest);
