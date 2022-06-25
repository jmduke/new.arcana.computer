import Icon from "./Icon";
import SubscribeForm from "./SubscribeForm";
import Widget from "./Widget";

const WIPNotice = ({ todos }) => (
  <Widget
    label="Work in Progress"
    items={[
      {
        right: null,
        left: (
          <div>
            Hello! This page is a draft. Feel free and poke around, but there
            are significant structural and contentual pieces yet to be
            implemented. Mind the proverbial construction noise, and feel free
            to subscribe here to get notified once it&apos;s completed:
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
        ),
      },
    ]}
  />
);

export default WIPNotice;
