// components/Spinner.jsx
import { Loader2 } from "lucide-react";

const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
  </div>
);

export default Spinner;
