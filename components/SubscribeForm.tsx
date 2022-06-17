const SubscribeForm = () => (
  <form
    action="https://buttondown.email/api/emails/embed-subscribe/arcana.computer"
    method="post"
    target="popupwindow"
    className="flex space-x-2"
  >
    <input
      type="email"
      name="email"
      placeholder="your@lovely.email"
      className="p-2 rounded-lg border border-solid border-gray-300 flex-1"
    />
    <input
      className="bg-brand rounded-lg text-white font-bold px-4 py-2 uppercase"
      type="submit"
      value="Subscribe"
    />
  </form>
);

export default SubscribeForm;
