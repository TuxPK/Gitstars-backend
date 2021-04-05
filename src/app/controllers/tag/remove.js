import Tag from '../../models/Tag';

export default async (req, res) => {
  const { uuid } = req.params;

  try {
    await Tag.destroy({
      where: {
        uuid,
      },
    });

    return res.json({ message: 'Tag successfully deleted.' });
  } catch (error) {
    throw new Error('Failed with an error in database request.');
  }
};
