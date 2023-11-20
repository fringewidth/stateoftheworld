import "./GlobeRender1.css";
import Globe from "../../../Globe/Globe";
import { motion } from "framer-motion";

function GlobeRender1() {
  return (
    <motion.div drag>
      <Globe />
    </motion.div>
  );
}

export default GlobeRender1;
