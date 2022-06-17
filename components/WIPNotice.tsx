import SubscribeForm from "./SubscribeForm";
import Icon from "./Icon";

const WIPNotice = ({ todos }) => (
  <div
    className="text-sm rounded-lg bg-subtle p-4 mb-4
  "
  >
    Hello! This page is a draft. Feel free and poke around, but there are
    significant structural and contentual pieces yet to be implemented. Mind the
    proverbial construction noise, and feel free to subscribe here to get
    notified once it's completed:
    <div className="py-2">
      <SubscribeForm />
    </div>
    Some things I still need to do:
    <div className="grid grid-cols-2 mt-2">
      {todos.map((todo) => (
        <div key={todo} className="flex items-center space-x-1">
          <Icon.Check />
          <div>{todo}</div>
        </div>
      ))}
    </div>
  </div>
);

export default WIPNotice;
