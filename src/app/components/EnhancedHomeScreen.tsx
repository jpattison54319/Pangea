import { useNavigate } from 'react-router';
import HomeScreen from '../../imports/HomeScreen/HomeScreen';

export default function EnhancedHomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative size-full" onClick={(e) => {
      const target = e.target as HTMLElement;

      // Check if clicking on the main button (daily question)
      if (target.closest('[data-name="Main button"]') || target.closest('[data-name="Round Button"]')) {
        navigate('/daily-question');
        e.stopPropagation();
        return;
      }

      // Check if clicking on Profile tab
      if (target.closest('[data-name="tab2"]')) {
        navigate('/profile');
        e.stopPropagation();
        return;
      }

      // Check if clicking on globe hotspots
      const hotspotNames = [
        'hotspot-kansas-city',
        'hotspot-western-europe',
        'hotspot-japan',
        'hotspot-india',
        'hotspot-namibia',
        'hotspot-brazil',
        'hotspot-australia',
        'hotspot-iceland',
        'hotspot-guatemala'
      ];

      for (const name of hotspotNames) {
        if (target.closest(`[data-name="${name}"]`)) {
          const regionMap: Record<string, string> = {
            'hotspot-kansas-city': 'kansas-city',
            'hotspot-namibia': 'namibia',
            'hotspot-guatemala': 'guatemala',
            'hotspot-japan': 'japan',
            'hotspot-iceland': 'iceland',
          };
          const region = regionMap[name] || 'kansas-city';
          navigate(`/globe-zoom/${region}`);
          e.stopPropagation();
          return;
        }
      }
    }}>
      <HomeScreen />
    </div>
  );
}
