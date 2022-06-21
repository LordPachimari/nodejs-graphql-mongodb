import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button } from "@mantine/core";
import { useRouter } from "next/router";

import { TextInput, Box, Card, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useCreateDemoQuestMutation,
  useDemoQuestsQuery,
} from "../src/generated/graphql";
import { response } from "express";
import Link from "next/link";

import { withUrqlClient } from "next-urql";

interface FormValues {
  name: string; // regular field, same as inferred type
}

function Demo() {
  const router = useRouter();
  const [, createDemoQuest] = useCreateDemoQuestMutation();

  const [{ data }] = useDemoQuestsQuery();
  console.log("data", data);

  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Button
          color="teal"
          onClick={async () => {
            const result = await createDemoQuest({});
            console.log("result", result);

            if (!result.data?.createDemoQuest) {
              console.log("some bad shit happend");
            } else {
              router.push(`/quest/${result.data.createDemoQuest}`);
            }
          }}
        >
          Create demo quest
        </Button>
      </Box>
      <Box>
        {data?.demoQuests.map((dq) => (
          <Link href={`/quest/${dq._id}`} key={dq._id}>
            <Box
              sx={(theme) => ({
                cursor: "pointer",
                background: "green",
                width: 200,
                height: 200,
              })}
            >
              <Text weight={500} size="lg">
                {dq.title}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
// }
// const Home: NextPage = () => {
//   return <h1>shit</h1>;
// };

export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url: "http://localhost:4000/graphql",
}))(Demo);
