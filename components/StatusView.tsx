import React, { useState } from 'react';
import { Send, Download, Eye, CheckCircle, FileText, Clock, ArrowLeft } from 'lucide-react';

interface BatchDetail {
    id: string;
    custName: string;
    amt: string;
    status: string;
}

export const StatusView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'sent' | 'updates'>('sent');
    const [viewEvidence, setViewEvidence] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

    const handleViewBatch = (batchId: string) => {
        setSelectedBatch(batchId);
    };

    const closeBatchView = () => {
        setSelectedBatch(null);
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => { setActiveTab('sent'); closeBatchView(); }}
                    className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'sent' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <Send size={16} className="inline mr-2" /> Log / Case Sent
                </button>
                <button 
                    onClick={() => { setActiveTab('updates'); closeBatchView(); }}
                    className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'updates' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <CheckCircle size={16} className="inline mr-2" /> Case Updates (Received)
                </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {/* SENT TAB */}
                {activeTab === 'sent' && !selectedBatch && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                                <div>
                                    <h4 className="font-bold text-gray-900">Batch #B-202{i} - Consumer Debt</h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="mr-1"/> Sent: Feb 2{i}, 10:00 AM
                                        <span className="mx-2">•</span>
                                        <span className="text-purple-600 font-medium">To: Global Recovery Partners</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleViewBatch(`B-202${i}`)}
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-white rounded-full transition-all"
                                    title="View Batch Details"
                                >
                                    <Eye size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* BATCH DETAIL VIEW */}
                {activeTab === 'sent' && selectedBatch && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center mb-4">
                            <button onClick={closeBatchView} className="mr-3 text-gray-500 hover:text-purple-600">
                                <ArrowLeft size={20} />
                            </button>
                            <h3 className="text-xl font-bold text-gray-900">Records in {selectedBatch}</h3>
                        </div>
                        <div className="overflow-auto rounded-xl border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Case ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[1, 2, 3, 4, 5].map((k) => (
                                        <tr key={k}>
                                            <td className="px-6 py-3 text-sm font-mono text-gray-600">C-00{k}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">Cust-{k} Ltd</td>
                                            <td className="px-6 py-3 text-sm text-gray-600">$ {(k * 1250).toLocaleString()}</td>
                                            <td className="px-6 py-3 text-sm"><span className="px-2 py-1 bg-gray-100 rounded text-xs">Sent to DCA</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* UPDATES TAB */}
                {activeTab === 'updates' && !viewEvidence && (
                    <div className="overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Cust Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Agency</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Amt Paid</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Current Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-purple-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">Wayne Enterprises</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">Apex Solutions</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600">$12,000</td>
                                    <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Paid</span></td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => setViewEvidence(true)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
                                            <FileText size={18} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'updates' && viewEvidence && (
                    <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <button onClick={() => setViewEvidence(false)} className="mb-4 text-sm font-bold text-gray-500 hover:text-purple-700">&larr; Back to List</button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Evidence & Details</h3>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div><span className="block text-gray-500 text-xs uppercase font-bold">Customer</span> <span className="text-lg font-bold">Wayne Enterprises</span></div>
                            <div><span className="block text-gray-500 text-xs uppercase font-bold">Status</span> <span className="text-lg font-bold text-green-600">Paid Full</span></div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center"><FileText className="text-purple-600 mr-3"/> <span>Final_Invoice.pdf</span></div>
                                <button className="text-purple-600 font-bold text-sm">View</button>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center"><FileText className="text-purple-600 mr-3"/> <span>Call_Recording_Feb24.mp3</span></div>
                                <button className="text-purple-600 font-bold text-sm">Play</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
