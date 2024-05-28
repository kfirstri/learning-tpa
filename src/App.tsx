import { Button, Page, Table, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import './App.css';

type LeadRecord = {
  email: string,
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED',
  validity: string,
  subscribeDate: string
}

function App() {
  const leads: LeadRecord[] = [
    {
      email: 'kfirs@wix.com',
      status: 'SUBSCRIBED',
      validity: 'VALID',
      subscribeDate: '01/12/2024'
    }
  ];

  const columns = [
    {
      title: 'Email',
      render: (row: LeadRecord) => row.email
    },
    {
      title: 'status',
      render: (row: LeadRecord) => row.status
    },
    {
      title: 'validity',
      render: (row: LeadRecord) => row.validity
    },
    {
      title: 'subscribeDate',
      render: (row: LeadRecord) => row.subscribeDate
    },
  ];


  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header title='Bla'
          actionsBar={
            <Button>Yo!</Button>
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
