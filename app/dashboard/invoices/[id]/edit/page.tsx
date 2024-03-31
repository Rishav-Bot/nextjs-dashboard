import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/invoices/edit-form"
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data"
import { notFound } from "next/navigation"
const page = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);
    if (!invoice) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    )
}

export default page