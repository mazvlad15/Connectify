import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chats from "./Chats";
import Users from "./Users";


const Option = () => {
  const [selectedChats, setSelectedChats] = useState<boolean>(true);

  const transitionVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="mt-5 p-4 tw-w-full ">
      <div className="d-flex tw-justify-around col-12">
        <div
          onClick={() => setSelectedChats(true)}
          className="text-center col-6 tw-cursor-pointer"
        >
          <h2 className="tw-text-primary">Chats</h2>
          {selectedChats && (
            <motion.div
              layoutId="underline"
              className="tw-border-b-4 tw-border-b-secondary"
              style={{ width: "100%" }}
            />
          )}
        </div>

        <div
          onClick={() => setSelectedChats(false)}
          className="text-center col-6 tw-cursor-pointer"
        >
          <h2 className="tw-text-primary">Users</h2>
          {!selectedChats && (
            <motion.div
              layoutId="underline"
              className="tw-border-b-4 tw-border-b-secondary"
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>

      <div className="tw-mt-5">
        <AnimatePresence mode="wait">
          {selectedChats ? (
            <motion.div
              key="chats"
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="tw-bg-white tw-rounded-xl p-1"
            >
              <Chats setSelectedChats={setSelectedChats}/>
            </motion.div>
          ) : (
            <motion.div
              key="users"
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="tw-bg-white tw-rounded-xl p-1"

            >
              <Users />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Option;
