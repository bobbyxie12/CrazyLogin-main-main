import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  loading?: boolean;
}

export const TextField = (props: InputProps) => {
  const { name, title, loading, className, ...rest } = props;

  return (
    <div {...rest} className={clsx("flex flex-col relative", className)}>
      <label className="text-xs font-bold text-left">{title ?? name}</label>
      <input
        {...rest}
        name={name}
        className={`ring-offset-0 ring-1 hover:ring-2 ring-slate-300 p-1 
          focus:outline-none duration-200 transition-shadow rounded-md w-full
            text-black
          `}
      />
      {loading && (
        <AiOutlineLoading className="animate-spin absolute right-2 bottom-2" />
      )}
    </div>
  );
};
