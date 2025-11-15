import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Therapy: React.FC = () => {
  return (
    <>
      {/* Meditation Section */}
      <div className="py-20 bg-gray-50" id="meditation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meditation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a
              href="https://youtu.be/_19sQY5pna8?si=zTBG_XGFx_X7I5LO"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="min-h-[14rem] flex flex-col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-6YED_5QM01XVIO6fczzy66sYdsWP0ADYug&s"
                  alt="Meditation for Anxiety"
                  className="w-full flex-1 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Anxiety</h3>
                </div>
              </div>
            </a>
            <a
              href="https://youtu.be/R_yFAMtfv9c?si=Jp7tLkQtKUd8v_5b"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="min-h-[14rem] flex flex-col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLprN4PiGhpcb0LkvwrJ2g_QNnbyVqsCUnGw&s"
                  alt="Stress Reduction"
                  className="w-full flex-1 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Stress Reduction</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Yoga Section */}
      <div className="py-20 bg-white" id="yoga">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Yoga</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a
              href="https://www.youtube.com/watch?v=SvPKFsCiMsw"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="min-h-[14rem] flex flex-col">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/016/699/876/non_2x/woman-stretching-workout-semi-flat-color-character-editable-figure-full-body-people-on-white-flexibility-exercises-simple-cartoon-style-illustration-for-web-graphic-design-and-animation-vector.jpg"
                  alt="Yoga Full Body Stretch"
                  className="w-full flex-1 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Yoga Full Body Stretch</h3>
                </div>
              </div>
            </a>
            <a
              href="https://youtu.be/xt9f_96Bkz4?si=NCwVjxbtCpOu7L9_"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="min-h-[14rem] flex flex-col">
                <img
                  src="https://www.shutterstock.com/image-vector/group-people-man-woman-jogging-260nw-2030860994.jpg"
                  alt="Walking Yoga Workout"
                  className="w-full flex-1 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Walking Yoga Workout</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="py-20 bg-gray-50" id="games">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              to="/games"
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="min-h-[14rem] flex flex-col">
                <img
                  src="https://asklistenlearn.org/wp-content/uploads/memory_flip_square_v2.png"
                  alt="Flip Cards"
                  className="w-full flex-1 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">CardFlip</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Therapy;