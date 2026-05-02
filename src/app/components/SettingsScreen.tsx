import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';
import { useT, LANGUAGES } from './i18n';
import {
  ChevronRight, User, Bell, Shield, Globe, Trash2, LogOut,
  Check, X, MessageCircle, UserPlus, Trophy, Calendar, Download,
  Eye, ChevronDown,
} from 'lucide-react';

type NotifFreq = 'daily' | 'weekly' | 'minimal';
type CommentAudience = 'everyone' | 'followers' | 'off';

export default function SettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { logout, language, setLanguage } = useApp();
  const t = useT();

  // Expanded sections
  const [section, setSection] = useState<'main' | 'notif' | 'privacy' | 'lang'>('main');

  // Notification settings
  const [notifDailyQ, setNotifDailyQ]       = useState(true);
  const [notifTrophy, setNotifTrophy]       = useState(true);
  const [notifFollower, setNotifFollower]   = useState(false);
  const [notifMissions, setNotifMissions]  = useState(true);
  const [notifFreq, setNotifFreq]           = useState<NotifFreq>('daily');

  // Privacy settings
  const [commentAudience, setCommentAudience] = useState<CommentAudience>('everyone');
  const [showInSearch, setShowInSearch]       = useState(true);

  const currentLang = LANGUAGES.find(l => l.code === language);

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-[44px] h-[24px] rounded-full transition-colors duration-200 shrink-0"
      style={{ background: on ? '#7e3f25' : '#d1d5db' }}
    >
      <div
        className="size-[20px] rounded-full bg-white transition-transform duration-200 shadow-sm"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );

  const Row = ({ icon: Icon, label, right, onClick, danger, sub }: any) => (
    <button
      onClick={onClick}
      className="w-full px-[14px] py-[13px] flex items-center gap-[10px] border-b border-black/5 last:border-0"
    >
      <Icon className={`size-[18px] shrink-0 ${danger ? 'text-red-500' : 'text-[#7e3f25]'}`} />
      <div className="flex-1 text-left">
        <p className={`font-['Inter:Regular',sans-serif] text-[14px] ${danger ? 'text-red-500' : 'text-[#281e1b]'}`}>
          {label}
        </p>
        {sub && (
          <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] mt-[1px]">{sub}</p>
        )}
      </div>
      {right !== undefined ? right : <ChevronRight className="size-[16px] text-[#6b6860] shrink-0" />}
    </button>
  );

  const SectionHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="px-[20px] pt-[4px] pb-[10px] flex items-center gap-[10px] shrink-0">
      <button onClick={onBack}>
        <ChevronDown className="size-[20px] text-[#7e3f25] rotate-90" />
      </button>
      <h1
        className="font-['Fraunces:Regular',sans-serif] text-[22px] text-[#281e1b]"
        style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
      >
        {title}
      </h1>
    </div>
  );

  const FreqPill = ({ val, label }: { val: NotifFreq; label: string }) => (
    <button
      onClick={() => setNotifFreq(val)}
      className="flex-1 py-[8px] rounded-full text-center transition-colors"
      style={{
        background: notifFreq === val ? '#7e3f25' : 'transparent',
        border: notifFreq === val ? 'none' : '1px solid rgba(126,63,37,0.2)',
      }}
    >
      <p
        className="font-['Inter:Medium',sans-serif] text-[12px]"
        style={{ color: notifFreq === val ? 'white' : '#7e3f25' }}
      >
        {label}
      </p>
    </button>
  );

  const CommentPill = ({ val, label }: { val: CommentAudience; label: string }) => (
    <button
      onClick={() => setCommentAudience(val)}
      className="flex-1 py-[8px] rounded-full text-center transition-colors"
      style={{
        background: commentAudience === val ? '#7e3f25' : 'transparent',
        border: commentAudience === val ? 'none' : '1px solid rgba(126,63,37,0.2)',
      }}
    >
      <p
        className="font-['Inter:Medium',sans-serif] text-[12px]"
        style={{ color: commentAudience === val ? 'white' : '#7e3f25' }}
      >
        {label}
      </p>
    </button>
  );

  const Label = ({ text }: { text: string }) => (
    <p
      className="font-['Inter:Medium',sans-serif] text-[11px] uppercase tracking-[0.1em] px-[4px] pt-[4px] pb-[6px]"
      style={{ color: '#C9633A' }}
    >
      {text}
    </p>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 bg-black/50 z-40 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#fff2ed] rounded-t-[24px] w-full max-h-[88%] flex flex-col overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex items-center justify-center pt-[8px] pb-[4px] shrink-0">
              <div className="w-[36px] h-[4px] rounded-full bg-black/20" />
            </div>

            <AnimatePresence mode="wait">

              {/* ── Main section ── */}
              {section === 'main' && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  <div className="px-[20px] pt-[4px] pb-[8px] flex items-center justify-between shrink-0">
                    <h1
                      className="font-['Fraunces:Regular',sans-serif] text-[24px] text-[#281e1b]"
                      style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                    >
                      {t('settings')}
                    </h1>
                    <button onClick={onClose}>
                      <X className="size-[20px] text-[#281e1b]" />
                    </button>
                  </div>
                  <div className="flex-1 px-[16px] pt-[4px] overflow-y-auto flex flex-col gap-[12px] pb-[28px]">
                    <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
                      <Row icon={User} label={t('edit_profile')} />
                      <Row
                        icon={Bell}
                        label={t('notifications')}
                        sub={t('notifications_sub')}
                        onClick={() => setSection('notif')}
                      />
                      <Row
                        icon={Shield}
                        label={t('privacy_title')}
                        sub={t('privacy_sub')}
                        onClick={() => setSection('privacy')}
                      />
                      <Row
                        icon={Globe}
                        label={`${t('language')} — ${currentLang?.flag} ${currentLang?.label}`}
                        onClick={() => setSection('lang')}
                      />
                    </div>
                    <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
                      <Row icon={Trash2} label={t('delete_account')} danger right={null} />
                      <Row
                        icon={LogOut}
                        label={t('log_out')}
                        right={null}
                        onClick={() => { logout(); onClose(); navigate('/welcome'); }}
                      />
                    </div>
                    <p className="text-[11px] text-[#6b6860] text-center">Pangea v1.0</p>
                  </div>
                </motion.div>
              )}

              {/* ── Notifications section ── */}
              {section === 'notif' && (
                <motion.div
                  key="notif"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  <SectionHeader title={t('notifications')} onBack={() => setSection('main')} />
                  <div className="flex-1 px-[16px] overflow-y-auto flex flex-col gap-[12px] pb-[28px]">

                    <div>
                      <Label text={t('notif_what')} />
                      <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
                        <Row
                          icon={Calendar}
                          label={t('notif_daily_q')}
                          sub={t('notif_daily_q_sub')}
                          right={<Toggle on={notifDailyQ} onClick={() => setNotifDailyQ(v => !v)} />}
                        />
                        <Row
                          icon={Trophy}
                          label={t('notif_trophies')}
                          sub={t('notif_trophies_sub')}
                          right={<Toggle on={notifTrophy} onClick={() => setNotifTrophy(v => !v)} />}
                        />
                        <Row
                          icon={UserPlus}
                          label={t('notif_followers')}
                          sub={t('notif_followers_sub')}
                          right={<Toggle on={notifFollower} onClick={() => setNotifFollower(v => !v)} />}
                        />
                        <Row
                          icon={MessageCircle}
                          label={t('notif_missions')}
                          sub={t('notif_missions_sub')}
                          right={<Toggle on={notifMissions} onClick={() => setNotifMissions(v => !v)} />}
                        />
                      </div>
                    </div>

                    <div>
                      <Label text={t('notif_frequency')} />
                      <div
                        className="bg-white rounded-[12px] p-[10px] shadow-sm flex gap-[6px]"
                      >
                        <FreqPill val="daily"   label={t('freq_daily')} />
                        <FreqPill val="weekly"  label={t('freq_weekly')} />
                        <FreqPill val="minimal" label={t('freq_minimal')} />
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] px-[4px] pt-[6px]">
                        {notifFreq === 'daily'
                          ? t('freq_daily_desc')
                          : notifFreq === 'weekly'
                          ? t('freq_weekly_desc')
                          : t('freq_minimal_desc')}
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ── Privacy section ── */}
              {section === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  <SectionHeader title={t('privacy_title')} onBack={() => setSection('main')} />
                  <div className="flex-1 px-[16px] overflow-y-auto flex flex-col gap-[12px] pb-[28px]">

                    <div>
                      <Label text={t('who_can_comment')} />
                      <div className="bg-white rounded-[12px] p-[10px] shadow-sm flex gap-[6px]">
                        <CommentPill val="everyone"  label={t('comment_everyone')} />
                        <CommentPill val="followers" label={t('comment_followers')} />
                        <CommentPill val="off"       label={t('comment_off')} />
                      </div>
                    </div>

                    <div>
                      <Label text={t('visibility')} />
                      <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
                        <Row
                          icon={Eye}
                          label={t('show_in_search')}
                          sub={t('show_in_search_sub')}
                          right={<Toggle on={showInSearch} onClick={() => setShowInSearch(v => !v)} />}
                        />
                      </div>
                    </div>

                    <div>
                      <Label text={t('your_data')} />
                      <div className="bg-white rounded-[12px] overflow-hidden shadow-sm">
                        <Row
                          icon={Download}
                          label={t('download_data')}
                          sub={t('download_data_sub')}
                          right={null}
                          onClick={() => {}}
                        />
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b6860] px-[4px] pt-[6px]">
                        {t('data_promise')}
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ── Language section ── */}
              {section === 'lang' && (
                <motion.div
                  key="lang"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 overflow-hidden"
                >
                  <SectionHeader title={t('language')} onBack={() => setSection('main')} />
                  <div className="flex-1 px-[16px] overflow-y-auto flex flex-col gap-[8px] pb-[28px]">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setSection('main'); }}
                        className="rounded-[12px] px-[14px] py-[12px] flex items-center gap-[10px]"
                        style={{ background: language === l.code ? '#7e3f25' : 'white' }}
                      >
                        <span className="text-[22px]">{l.flag}</span>
                        <p
                          className="flex-1 text-left text-[14px] font-['Inter:Medium',sans-serif]"
                          style={{ color: language === l.code ? 'white' : '#281e1b' }}
                        >
                          {l.label}
                        </p>
                        {language === l.code && <Check className="size-[16px] text-white" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}