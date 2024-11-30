import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '@tonconnect/ui-react';

const TonButton = ({ onClick, children }) => {
  const { connected } = useTonConnect();

  return (
    <div className="ton-button-wrapper">
      <TonConnectButton />
      {connected && (
        <button 
          className="ton-action-button"
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default TonButton; 