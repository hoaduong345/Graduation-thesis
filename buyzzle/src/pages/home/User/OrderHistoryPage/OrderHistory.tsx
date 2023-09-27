import React from 'react'
import Container from '../../../../components/container/Container'

export default function OrderHistory() {
    return (
        <Container>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light">
                                <thead
                                    className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                                    <tr>
                                        <th scope="col" className=" px-6 py-4">#</th>
                                        <th scope="col" className=" px-6 py-4">First</th>
                                        <th scope="col" className=" px-6 py-4">Last</th>
                                        <th scope="col" className=" px-6 py-4">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap  px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap  px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap  px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap  px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap  px-6 py-4 ">Jacob</td>
                                        <td className="whitespace-nowrap  px-6 py-4">Thornton</td>
                                        <td className="whitespace-nowrap  px-6 py-4">@fat</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap  px-6 py-4 font-medium">3</td>
                                        <td colSpan={2} className="whitespace-nowrap  px-6 py-4">
                                            Larry the Bird
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
