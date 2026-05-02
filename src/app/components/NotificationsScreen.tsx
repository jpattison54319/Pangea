import { useNavigate } from 'react-router';
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { useT } from './i18n';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const t = useT();

  const NOTIFICATIONS = [
    { id: '1', user: '@tuahepa.wnb', content: t('notif_liked'),      time: '2h', icon: Heart,         color: 'text-red-500' },
    { id: '2', user: '@isabela.ant', content: t('notif_commented'),   time: '5h', icon: MessageCircle, color: 'text-[#7e3f25]' },
    { id: '3', user: '@kenji.tyo',   content: t('notif_following'),   time: '1d', icon: UserPlus,      color: 'text-[#1F6B6B]' },
    { id: '4', user: 'Pangea',       content: t('notif_daily_ready'), time: '1d', icon: Bell,          color: 'text-[#E8B04B]' },
  ];

  return (
    <div className="bg-[#fff2ed] flex flex-col relative size-full overflow-hidden safe-top">
      <div className="h-[32px] flex items-center px-[20px] shrink-0">
        <button onClick={() => navigate(-1)}>
          <p className="font-['DM_Sans:Regular',sans-serif] text-[15px] text-[#281e1b]">← {t('back')}</p>
        </button>
      </div>

      <div className="px-[20px] pb-[8px] shrink-0">
        <h1 className="font-['Fraunces:Regular',sans-serif] text-[26px] text-[#281e1b]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          {t('notifications')}
        </h1>
      </div>

      <div className="flex-1 px-[16px] pt-[8px] overflow-y-auto flex flex-col gap-[8px]">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className="bg-white rounded-[12px] p-[12px] flex items-start gap-[10px] shadow-sm">
            <div className="bg-[#fff2ed] rounded-full size-[36px] flex items-center justify-center shrink-0">
              <n.icon className={`size-[18px] ${n.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#281e1b] leading-[1.4]">
                <span className="font-bold">{n.user}</span> {n.content}
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mt-[2px]">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}