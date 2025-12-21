import QRCode from 'react-qr-code';

export default function Display() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <QRCode 
        value="https://example.com" 
        size={122}
        className="max-w-full h-auto"
      />
    </div>
  );
}
