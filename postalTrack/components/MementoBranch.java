package components;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <p>fields:
 * <br>BranchMe - object of branch to save previous condition ({@link}Branch)
 * <br>getMainBefor - to return the previous condition of system
 */

public class MementoBranch {
	private static Branch BranchMe;
	public static boolean flag = false;
	public MementoBranch(Branch B) {
		BranchMe = B;
		flag = true;
	}
	public static void getMainBefor() {
		if (BranchMe != null) {
			flag = false;
			MainOffice.getHub().remove_branch(BranchMe);
			BranchMe = null;
		}
	}
}
