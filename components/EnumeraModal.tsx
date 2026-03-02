import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Zap, Microscope, Leaf } from 'lucide-react';

interface EnumeraModalProps {
    onClose: () => void;
}

export const EnumeraModal: React.FC<EnumeraModalProps> = ({ onClose }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 mb-10 mt-10">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-full overflow-hidden relative z-10 flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-100 bg-gray-50 shrink-0">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
                            <Microscope size={14} />
                            <span className="text-xs font-bold tracking-wide uppercase">Product Range</span>
                        </div>
                        <h2 className="text-3xl font-heading font-extrabold text-primary">ENUMERA</h2>
                        <p className="text-gray-500 mt-2 font-medium">The complete range features 3 Kits: <span className="text-primary font-bold">Enumera E.Coli</span>, <span className="text-primary font-bold">Enumera Coliphages</span>, and <span className="text-primary font-bold">Enumera Enterococcus</span>.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 sm:p-8 overflow-y-auto">

                    {/* Intro Section */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center text-primary"><Zap className="mr-2 text-secondary" size={20} /> Next-Generation Chromogenic Technology</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Revolutionizing water analysis and field and laboratory testing with a comprehensive system that combines our Smart Cap technology with advanced color-changing chromogenic chemistry. We've engineered a solution that redefines the standards of safety, speed, and reliability in water microbiology.
                        </p>
                    </div>

                    <hr className="border-gray-100 mb-10" />

                    {/* Core Innovation */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center text-primary"><ShieldCheck className="mr-2 text-secondary" size={20} /> Our Innovation: Smart Cap & Zero-UV System</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Traditional water analysis relies on outdated workflows that require manual handling of reagents and the use of ultraviolet (UV) detection equipment. Our technology solves these problems at their root through two key innovations:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-primary mb-3">Zero-Touch Workflow</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Our <strong>Twist & Mix</strong> reagent delivery system is integrated directly into the sample bottle cap. This means that once water is added, the chain of sterility is not broken. Simply twist and mix, releasing the culture medium without the need to reopen the bottle.
                                </p>
                            </div>
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-primary mb-3">UV-Free Visual Readout</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    We've replaced standard fluorogenic methods with superior chromogenic chemistry. Our substrates generate a visible color change under ambient light, completely eliminating the need for UV lamps.
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-10" />

                    {/* The Kits */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center text-primary"><CheckCircle2 className="mr-2 text-secondary" size={20} /> The Enumera Range: One Solution, Three Parameters</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Our technology platform is implemented in three specialized kits, all driven by the same philosophy of efficiency, visual accuracy, and complete absence of UV hardware.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Enumera E. coli</h4>
                                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">Simultaneous and accurate detection of total coliforms and Escherichia coli. It produces a clear binary color change (yellow for coliforms, green/cyan for E. coli) that eliminates the ambiguity and subjectivity of fluorescent readings.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Enumera Enterocos</h4>
                                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">Based on our same UV-free chromogenic technology and Smart Cap system, designed for the rapid and reliable detection of enterococci.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Enumera Coliphage</h4>
                                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">The perfect solution to optimize your analytical capacity, allowing laboratories to streamline their workflows and easily adapt to regulatory requirements, operating under the same premise of safety and visual simplicity.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary text-white p-8 rounded-3xl shadow-inner mt-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10"><Leaf size={200} /></div>
                        <h3 className="text-2xl font-bold mb-6 relative z-10">Why choose Enumera technology?</h3>
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <h4 className="font-bold text-secondary text-lg mb-2">Unmatched Workplace Safety</h4>
                                <p className="text-gray-300 text-sm">By eliminating reliance on UV-A (365 nm) radiation, we eradicate a chronic occupational risk, protecting technicians from prolonged exposure that contributes to eye problems.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-lg mb-2">Maximum Operational Efficiency</h4>
                                <p className="text-gray-300 text-sm">The Smart Cap system eliminates redundant steps: searching for the reagent, opening the sachet, pouring the powder, and disposing of the wrapper. No spills or cross-contamination.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-lg mb-2">Reliability and Accuracy</h4>
                                <p className="text-gray-300 text-sm">Our chemistry eliminates the false positive and negative rates associated with weak fluorescence. The chromogenic method provides a direct and unambiguous reading.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-lg mb-2">Commitment to Sustainability</h4>
                                <p className="text-gray-300 text-sm">Significantly reduce your carbon footprint and waste. By eliminating the need for UV lamps, you eliminate a constant source of electronic waste (mercury bulbs) and reduce micro-waste from aluminum reagent sachets.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};
