import { useNavigate } from 'react-router';
import OnboardingScreen from '../../imports/OnboardingScreen/OnboardingScreen';

export default function EnhancedOnboarding() {
  const navigate = useNavigate();

  return (
    <div className="relative size-full" onClick={(e) => {
      const target = e.target as HTMLElement;

      // Check if clicking on the create account button
      if (target.closest('[data-name="Button Large Primary"]')) {
        navigate('/create-account');
        e.stopPropagation();
      }
    }}>
      <OnboardingScreen />
    </div>
  );
}
