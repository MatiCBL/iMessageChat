import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import MessageOperations from "../../../../graphql/operations/message";
import { MessagesData, MessagesVariables } from "../../../../util/types";
import toast from "react-hot-toast";
import SkeletonLoader from "../../../common/SkeletonLoader";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Query.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  if (error) {
    return null;
  }

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height="60px" />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((message) => (
            // <MessageItem />
            <div key={message.body}>{message.body}</div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;