import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';



interface ModeToggleProps {
  onToggleMode: () => void;
  isDarkMode: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ onToggleMode, isDarkMode }) => {
  return (
    <button
      onClick={onToggleMode}
      style={{
        position: 'absolute',
        top: 80,
        right: 10,
        padding: '20px 31px',
        backgroundColor: isDarkMode ? '#ffffff' : '#2c2c2c',
        color: isDarkMode ? '#2c2c2c' : '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
  );
};

export default ModeToggle;
