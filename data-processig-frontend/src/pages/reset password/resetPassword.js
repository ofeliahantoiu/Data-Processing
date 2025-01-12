const ResetPassword = ()  => {
    return (
        <div className="reset-container">
            <h1 className="reset-title">RESET PASSWORD</h1>
            <form>
                <div className="form-line">
                    <label for="newPassword">New Password</label>
                    <input type="password" id="newPassword" className="password-input" name="newPassword" required/>
                </div>
                <div className="form-line">    
                    <label for="repeatNewPassword"> Repeat New Password</label>
                    <input type="password" id="repeatNewPassword" className="password-input" name="repeatNewPassword" required/>
                </div>
                <button type="submit" id="reset-button">Reset</button>
            </form>
        </div>
    );
}

export default ResetPassword