import { gql } from "@apollo/client";
import { MessageFields } from "./message";

const ConversationFields = `
        id
        participants {
          user {
            id
            username
          }
          hasSeenLatestMessage
        }
        latestMessage {
          ${MessageFields}
        }
        updatedAt
`;

export default {
  Queries: {
    conversations: gql`
      query Conversations {  
        conversations {
          ${ConversationFields}
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
    markConversationAsRead: gql`
      mutation markConversationAsRead(
        $userId: String!
        $conversationId: String!
      ) {
        markConversationAsRead(userId: $userId, conversationId: $conversationId)
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${ConversationFields}
        }
      }
    `,
    conversationUpdated: gql`
      subscription ConversationUpdated {
        conversationUpdated {
          conversation {
            ${ConversationFields}
          }
        }
      }
    `,
  },
};
