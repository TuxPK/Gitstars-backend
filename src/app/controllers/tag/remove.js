import Tag from '../../models/Tag';

export default async (req, res) => {
  const { uuid } = req.params;

  try {
    const response = await deleteUser(uuid);

    return res.jsons(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

async function deleteUser(uuid) {
  try {
    await Tag.destroy({
      where: {
        uuid,
      },
    });

    return { message: 'Tag successfully deleted.' };
  } catch (error) {
    throw new Error('Failed with an error in database request.');
  }
}
