import { useMemo } from 'react';

// Component for generating random paper-like artifacts
interface Artifact {
  type: 'speck' | 'crease' | 'stain';
  top: number;
  left: number;
  opacity: number;
  size?: number; // for speck and stain
  length?: number; // for crease
  rotation?: number; // for crease
  id: string; // unique key
}

export default function PaperBackground() {
  // Generate random artifacts once per mount (per bill instance)
  const artifacts = useMemo(() => {
    const speckCount = 40 + Math.floor(Math.random() * 40); // 40-80 specks
    const creaseCount = 5 + Math.floor(Math.random() * 5); // 5-10 creases
    const stainCount = 2 + Math.floor(Math.random() * 3); // 2-4 stains

    const items: Artifact[] = [];

    // Specks (Tiny dark dots)
    for (let i = 0; i < speckCount; i += 1) {
      items.push({
        id: `speck-${i}-${Math.random()}`,
        type: 'speck',
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.1 + Math.random() * 0.2, // 0.1 - 0.3
        size: 1 + Math.random() * 2, // 1px - 3px
      });
    }

    // Creases (Faint lines)
    for (let i = 0; i < creaseCount; i += 1) {
      items.push({
        id: `crease-${i}-${Math.random()}`,
        type: 'crease',
        top: Math.random() * 100,
        left: Math.random() * 100,
        length: 20 + Math.random() * 100, // 20px - 120px
        rotation: Math.random() * 360,
        opacity: 0.05 + Math.random() * 0.1,
      });
    }

    // Stains (Faint blobs)
    for (let i = 0; i < stainCount; i += 1) {
      items.push({
        id: `stain-${i}-${Math.random()}`,
        type: 'stain',
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 20 + Math.random() * 40,
        opacity: 0.03 + Math.random() * 0.05,
      });
    }

    return items;
  }, []);

  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden z-0'>
      {artifacts.map(item => {
        if (item.type === 'speck') {
          return (
            <div
              key={item.id}
              className='absolute bg-gray-800 rounded-full'
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                opacity: item.opacity,
              }}
            />
          );
        }
        if (item.type === 'crease') {
          return (
            <div
              key={item.id}
              className='absolute bg-gray-400'
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.length}px`,
                height: '1px',
                transform: `rotate(${item.rotation}deg)`,
                opacity: item.opacity,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            />
          );
        }
        if (item.type === 'stain') {
          return (
            <div
              key={item.id}
              className='absolute rounded-full'
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                background: 'radial-gradient(circle, rgba(160,140,100,0.2) 0%, rgba(255,255,255,0) 70%)',
                opacity: item.opacity,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
