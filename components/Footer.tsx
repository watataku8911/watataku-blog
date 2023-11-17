const Footer = () => {
  return (
    <footer className=" mt-6 border-solid border-[#eaeaea] border-1 bg-[linear-gradient(to_left,_#5bbee4_0%,_#ADDFF2_100%)] dark:bg-[linear-gradient(to_left,_#7388c0_0%,_#1D2231_100%)] dark:text-white">
      <div className="text-center pt-6 text-2xl">&copy;2022 Watataku.</div>
      <small className="block pb-2 pr-2 text-right tbpc:text-[0.65rem] maxsp:text-center maxsp:pr-0 maxsp:pt-2">
        Create by Next.js / Typescript / TailwindCSS / microCMS
      </small>
    </footer>
  );
};
export default Footer;
