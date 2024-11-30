import { Share2, Link, Twitter, Facebook } from 'lucide-react';
import { Share } from 'lucide-react';
import { useState } from 'react';

const ShareButton = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out this article',
  text = 'I thought you might find this interesting!'
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Handle Web Share API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.log('Failed to copy:', err);
    }
    setShowDropdown(false);
  };

  // Social media share URLs
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="relative inline-block">
      {/* <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button> */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
       <Share className="w-4 h-4" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={copyToClipboard}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Link className="w-4 h-4 mr-3" />
              {copySuccess ? 'Copied!' : 'Copy link'}
            </button>

            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Twitter className="w-4 h-4 mr-3" />
              Share on Twitter
            </a>

            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Facebook className="w-4 h-4 mr-3" />
              Share on Facebook
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;