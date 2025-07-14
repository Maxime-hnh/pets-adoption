"use client"
import { SegmentedControl } from "@/_components/ui/segmented-control";
import { MessagesTab, useAdminStore } from "@/_stores/admin.store";

export default function MessagesSegmentedControl() {

  const activeTab = useAdminStore((state) => state.activeMessagesTab);
  const setActiveTab = useAdminStore((state) => state.setActiveMessagesTab);

  return (
    <SegmentedControl
      value={activeTab}
      onChange={(value) => setActiveTab(value as MessagesTab)}
      className="h-9"
      options={[
        { label: 'Tous', value: 'all' },
        { label: 'Non lus', value: 'unread' },
      ]}
    />
  )
}