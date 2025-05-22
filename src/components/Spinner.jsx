
import { Loader2 } from "lucide-react";

const Spinner = () => (
  <div className="flex flex-col justify-center items-center h-40 space-y-3">
    <Loader2 className="animate-spin w-10 h-10 text-blue-500 drop-shadow-lg transition-transform duration-300" />
    <div className="w-32 h-2 bg-blue-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-400 animate-pulse rounded-full w-1/2"></div>
    </div>
    <span className="text-blue-600 text-sm animate-bounce mt-2">Loading, please wait...</span>
  </div>
);

export default Spinner;
