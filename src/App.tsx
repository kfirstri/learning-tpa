import { Button, Page, Table, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import './App.css';

type LeadRecord = {
  email: string,
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED',
  validity: 'VALID' | 'INVALID',
  subscribeDate: string
}

function App() {
  const leads: LeadRecord[] = [
    {
      email: 'kfirs@wix.com',
      status: 'SUBSCRIBED',
      validity: 'VALID',
      subscribeDate: '01/12/2024'
    },
  ];

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
