import TonButton from './TonButton';

function YourComponent() {
  const handleClick = async () => {
    // Your TON-related logic here
    console.log('TON button clicked!');
  };

  return (
    <TonButton onClick={handleClick}>
      Send TON
    </TonButton>
  );
} 