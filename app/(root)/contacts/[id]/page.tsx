
import Messages from "@/components/Messages";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { fetchMessages } from "@/lib/actions/message.actions";
import { User } from "@/lib/actions/user.actions";
import { Message } from "@/lib/actions/message.actions";

async function Page({ params }: { params: { id: string } }) {
  console.log("params", params);

  const rawCurentUser = await currentUser();
  if (!rawCurentUser) return null;

  const rawRecipient = await fetchUser(params.id);
  const rawUser = await fetchUser(rawCurentUser.id);

  const user: User = {
    id: rawUser.id,
    username: rawUser.username,
    name: rawUser.name,
    image: rawUser.image,
    path: rawUser.path,
  };

  const recipient: User = {
    id: rawRecipient.id,
    username: rawRecipient.username,
    name: rawRecipient.name,
    image: rawRecipient.image,
    path: rawRecipient.path,
  };

  const data = await fetchMessages({ senderId: user.id });

  const rawMessages = JSON.parse(JSON.stringify(data?.messages));

  const messages = rawMessages.map((message: Message) => {
    let newMessage: Message = {
      messageContent: message.messageContent,
      recipientId: message.recipientId,
      senderId: message.senderId,
      timeStamp: message.timeStamp,
    };
    return newMessage;
  });

  return (
    <div>
      <Messages user={user} recipient={recipient} messages={messages} />
    </div>
  );
}
export default Page;
