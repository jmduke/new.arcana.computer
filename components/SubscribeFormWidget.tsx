import SubscribeForm from "./SubscribeForm";

const SubscribeFormWidget = () => (
  <div className="my-4 lg:my-8 clear-both">
    <div className="rounded-t-lg bg-subtler border-solid border-subtler border border-b-0 uppercase font-bold text-sm py-2 px-4">
      Want to read more?
    </div>
    <div className="bg-subtle p-4 border-solid border-subtler border border-t-0 rounded-b-lg">
      <SubscribeForm />
    </div>
  </div>
);

export default SubscribeFormWidget;
