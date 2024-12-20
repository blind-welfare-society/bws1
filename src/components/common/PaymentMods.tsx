import Image from "next/image";
const PaymentMods = () => {
    return (
        <div className="row mt-15 payment-mods">
            <div className="col-md-12 mb-10">
                <p className="fst-italic fw-bold">Donations made to Blind Welfare Society are Exempted under section 80G of Indian Income Tax Act, 1961.</p>
            </div>
            <div className="col-md-12 text-center mb-10">
                <div className="mode-info">
                    <h4 className="fw-bold mb-2">Donate via UPI</h4>
                    <div className="text-center">
                        <Image src={"/assets/img/about/UPI_Scanner.jpeg"} width={300} height={418} className="qr-code" alt="UPI_Scanner" title="UPI_Scanner" />
                    </div>
                    <p className="pt-2 text-start note">In case you have donated directly through UPI, kindly E-Mail your details such as Name, Address and PAN for 80G receipt on <a className="text-decoration-underline" href="mailto:info@blindwelfaresociety.in">info@blindwelfaresociety.in</a></p>
                </div>
            </div>
            <div className="col-md-12">
                <div className="mode-info">
                    <h4 className="fw-bold mb-2 text-center">Bank Transfers</h4>
                    <p>You can transfer your contributions in the below account:</p>
                    <p><strong>Account Holder Name:</strong> Blind Welfare Society</p>
                    <p><strong>Account Number:</strong> 31073619505</p>
                    <p><strong>Bank Name:</strong> State Bank of India</p>
                    <p><strong>Branch Name:</strong> Jawalaheri</p>
                    <p><strong>RTGS/IFSC/NEFT Code:</strong> SBIN0006623</p>
                    <p className="note">If you have transfer funds in our account, kindly E-Mail your details such as Name, Address and PAN for 80G receipt on <a className="text-decoration-underline" href="mailto:info@blindwelfaresociety.in">info@blindwelfaresociety.in</a></p>
                </div>                    
            </div>
            <div className="col-md-12 mb-10 pt-30">
                <h4 className="fw-bold mb-2 text-center">International Donations</h4>
                <p className="mb-1">If you are donating from outside India, you can contribute through Every.org which is a most largest and trusted donation platform.</p>
                <p>Donations made to Every.org are exempted under section 501(C) for US residence.</p>
                <p className="mt-20"><a className="donate-btn" href="https://www.every.org/blind-welfare-society?q=blind+welfare+society&amp;donateTo=blind-welfare-society#/donate/card" target="_blank">Donate Now</a></p>
            </div>
            <div className="col-md-12 mb-10">
                <h4 className="fw-bold mb-2 text-center mb-4">Success Stories</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
                            <iframe
                                src="https://www.youtube.com/embed/neo3BfoZs4A"
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Embedded YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
                            <iframe
                                src="https://www.youtube.com/embed/SPgjzsIsk6Y"
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Embedded YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
                            <iframe
                                src="https://www.youtube.com/embed/5ULBbQLktQk"
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Embedded YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentMods;