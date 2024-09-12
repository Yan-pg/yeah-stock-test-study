interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
}

export function Textarea({ label, error, ...rest }: TextareaProps) {
  return (
    <div>
      {label && <label className="text-gray-primary">{label}</label>}

      <textarea
        className="w-full bg-[#242424] text-gray-primary placeholder:text-gray-primary p-2 outline-none rounded-lg"
        {...rest}
        name="Description"
        rows={4}
      ></textarea>
      {error && <span className="text-red-600">{label} is required</span>}
    </div>
  );
}
