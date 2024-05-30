import { Button, Page, Table, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import './App.css';
import { useEffect, useState } from 'react';

type LeadRecord = {
  email: string,
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED',
  validity: 'VALID' | 'INVALID',
  subscribeDate: string
}


function App() {
  const [subscriptionsData, setSubscriptionsData] = useState<Array<Record<string, string>>>();
  const leads: LeadRecord[] = subscriptionsData?.map(item => { return { email: item.email, status: 'SUBSCRIBED', validity: 'VALID', subscribeDate: 'today' } }) || [];

  const columns = [
    {
      title: 'Email',
      render: (row: LeadRecord) => row.email
    },
    {
      title: 'Status',
      render: (row: LeadRecord) => row.status
    },
    {
      title: 'Validity',
      render: (row: LeadRecord) => row.validity
    },
    {
      title: 'Subscribe Date',
      render: (row: LeadRecord) => row.subscribeDate
    },
  ];


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const instance = searchParams.get('instance');

    if (!instance) {
      return;
    }

    const fetchSubscriptions = async () => {
      const data = await fetch(`/api/getSubscriptions?instance=${instance}`);
      setSubscriptionsData(await data.json());
    };

    fetchSubscriptions();
  });


  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header title='Subscribers'
          actionsBar={
            <Button>Update</Button>
          } />
        <Page.Content>
          <Table skin="standard" data={leads} columns={columns}>
            <Table.Content />
          </Table>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  )
}

export default App
